import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB for video

const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const videoTypes = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "no file" }, { status: 400 });
    }

    const isImage = imageTypes.includes(file.type);
    const isVideo = videoTypes.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "仅支持 JPG/PNG/WebP/AVIF 图片或 MP4/WebM/MOV 视频" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "文件不能超过 200MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9\u4e00-\u9fff._-]/g, "_");
    const fileName = category + "_" + timestamp + "_" + safeName;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: "/uploads/" + fileName,
      fileName: fileName,
      size: file.size,
      type: isVideo ? "video" : "image",
    });
  } catch (error) {
    console.error("upload failed:", error);
    return NextResponse.json({ error: "upload failed" }, { status: 500 });
  }
}
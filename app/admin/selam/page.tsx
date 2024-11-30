import FileUploader from "@/app/components/FileUploader";

export default function Home() {
    return (
        <main className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Image Upload Demo</h1>
            <FileUploader />
        </main>
    );
}
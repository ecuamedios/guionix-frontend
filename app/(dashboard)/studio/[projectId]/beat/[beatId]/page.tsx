// app/(dashboard)/studio/[projectId]/beat/[beatId]/page.tsx
interface BeatPageProps {
  params: Promise<{
    projectId: string;
    beatId: string;
  }>;
}

export default async function BeatPage({ params }: BeatPageProps) {
  const { projectId, beatId } = await params;
  
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Editor de Beat - Proyecto {projectId}
        </h1>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-300">Editor de beat ID: {beatId}</p>
          <p className="text-gray-400 mt-2">Editor en desarrollo...</p>
        </div>
      </div>
    </div>
  );
}
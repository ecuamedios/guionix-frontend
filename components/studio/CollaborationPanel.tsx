// components/studio/CollaborationPanel.tsx (SUPER AVANZADO, COLABORACIÓN EN VIVO)
// filepath: components/studio/CollaborationPanel.tsx
"use client";
import { useEffect, useState } from "react";
import type { CollaborationLock, CollaborationComment } from "@/types/collaboration";
import { useCollaboration } from "@/hooks/useCollaboration";
import { UserCircle, Lock, Unlock } from "lucide-react";

interface CollaborationPanelProps {
  resourceId: string;
  currentUserId: string;
}

export default function CollaborationPanel({ resourceId, currentUserId }: CollaborationPanelProps) {
  const { locks, comments, fetchLocks, fetchComments, setComments } = useCollaboration(resourceId);
  const [newComment, setNewComment] = useState("");

  // Simulación de actualización en vivo (WebSocket recomendado en producción)
  useEffect(() => {
    fetchLocks();
    fetchComments();
    const interval = setInterval(() => {
      fetchLocks();
      fetchComments();
    }, 4000);
    return () => clearInterval(interval);
  }, [resourceId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    // Aquí deberías llamar a tu API real para agregar comentario
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        resourceId,
        userId: currentUserId,
        content: newComment,
        createdAt: new Date(),
        resolved: false,
        replies: [],
      },
    ]);
    setNewComment("");
  };

  return (
    <aside className="bg-gray-900 border-l border-gray-800 p-4 rounded-xl shadow-lg w-full max-w-xs space-y-4">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <UserCircle className="w-5 h-5 text-yellow-400" /> Colaboración en vivo
      </h3>
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Locks activos:</div>
        {locks.length === 0 && <div className="text-gray-500 text-xs">Sin bloqueos</div>}
        {locks.map(lock => (
          <div key={lock.id} className="flex items-center gap-2 text-xs text-gray-300">
            {lock.userId === currentUserId ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-red-400" />}
            {lock.userId}
            <span className="ml-auto">{lock.type}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xs text-gray-400 mb-1">Comentarios:</div>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {comments.map(comment => (
            <div key={comment.id} className="bg-gray-800 rounded p-2 text-xs text-gray-200">
              <span className="font-bold text-yellow-400">{comment.userId}</span>: {comment.content}
              <div className="text-gray-500 text-[10px]">{new Date(comment.createdAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
        <div className="flex mt-2 gap-2">
          <input
            className="flex-1 rounded bg-gray-800 text-white px-2 py-1 text-xs"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddComment()}
          />
          <button
            className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold hover:bg-yellow-500"
            onClick={handleAddComment}
            type="button"
          >
            Enviar
          </button>
        </div>
      </div>
    </aside>
  );
}
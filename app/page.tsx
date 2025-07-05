import BoardList from "@/components/BoardList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="h-screen bg-pattern flex flex-col">
        <BoardList />
      </div>
    </ProtectedRoute>
  );
}

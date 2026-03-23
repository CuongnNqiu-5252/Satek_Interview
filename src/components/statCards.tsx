import { Card, CardContent} from "./ui/card"
import { CheckCircle2, Flag, Star, Clock, Target } from "lucide-react"


export default function StatCards({ stats }: { stats: { total: number; completed: number; pending: number; overdue: number; } }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-sm text-slate-600">Total Tasks</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{stats.completed}</div>
                <div className="text-sm text-slate-600">Completed</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{stats.pending}</div>
                <div className="text-sm text-slate-600">Pending</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Flag className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{stats.overdue}</div>
                <div className="text-sm text-slate-600">Overdue</div>
              </CardContent>
            </Card>
          </div>
  );
}
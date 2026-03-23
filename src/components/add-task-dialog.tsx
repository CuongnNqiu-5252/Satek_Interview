import { useState } from "react"
import { Input } from "./ui/input"
import { DatePicker } from './ui/DatePicker';
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dayjs } from 'dayjs';
import { addTask } from "../features/todo/services/taskService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import type { Task } from "../types/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
type Props = {
    onAdd: (todo: any) => void;
}
const CATEGORIES = ["Work", "Personal", "Shopping", "Others"]

export default function AddTask({ onAdd }: Props) {
    const [time, setTime] = useState<Dayjs>();
    const [dueDate, setDueDate] = useState<Date | undefined>(new Date())
    const [inputValue, setInputValue] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("todo")
    const [selectedPriority, setSelectedPriority] = useState("todo")
    const [deadline, setDeadline] = useState<Date | undefined>(new Date())
    const addTaskCard = async () => {
        if (!dueDate) return;

        let endDate = new Date(dueDate);
        if (time) {
            endDate.setHours(time.hour(), time.minute(), 0, 0);
        }

        if (inputValue.trim() !== "") {
            const newTask: Partial<Task> = {
                title: inputValue.trim(),
                completed: false,
                created_at: new Date(),
                deadline: endDate,
            };
            console.log(newTask);
            await addTask(newTask);
            setInputValue("");
            setDueDate(new Date());
            setTime(undefined);
            onAdd(newTask);
        }
    }
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Add a new task to your todo list.
                    </DialogDescription>
                </DialogHeader>
                <Card className="bg-white/90 backdrop-blur border-0 shadow-lg">
                    <ToastContainer
                        position="top-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                    <CardHeader>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                placeholder="What needs to be done?"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && addTaskCard()}
                                className="bg-white border-slate-200"
                            />

                            <Select
                                value={selectedPriority}
                                onValueChange={(value: "todo" | "inprogress" | "done") => setSelectedPriority(value)}
                            >
                                <SelectTrigger className="bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">Todo</SelectItem>
                                    <SelectItem value="inprogress">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <DatePicker onChange={setDeadline} />
                    </CardContent>
                </Card>
                <DialogFooter showCloseButton={true}>
                    <Button variant="outline" onClick={addTaskCard}>Add Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
interface DatePickerProps {
    onChange: (date: Date) => void;
}
export function DatePicker({ onChange }: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>()
    React.useEffect(() => {
        if (date) {
            onChange(date)
        }
    }, [date])
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
        </Popover>
    )
}
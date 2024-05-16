import { useState } from 'react';
import './App.css';
import { Calendar } from './components/ui/calendar';

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <h1 className="text-4xl">{date?.toDateString()}</h1>
      <div className='flex'>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </div>
    </>
  );
}

export default App;

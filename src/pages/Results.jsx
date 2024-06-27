import Filter from '../components/Filter';
import TrainOption from '../components/TrainOption';

const Results = () => {
    const trainOptions = [
        { id: 1, departure: '05:54', arrival: '15:07', duration: '9h 13m', changes: 3, price: 116 },
        { id: 2, departure: '06:42', arrival: '17:07', duration: '10h 25m', changes: 2, price: 71 },
        { id: 3, departure: '07:43', arrival: '17:07', duration: '9h 24m', changes: 3, price: 108 },
        { id: 4, departure: '09:07', arrival: '18:19', duration: '9h 12m', changes: 3, price: 103 },
        { id: 5, departure: '11:21', arrival: '20:19', duration: '8h 58m', changes: 3, price: 106 },
    ];

    return (
        <div className="flex flex-col">
          <div className='bg-slate-500 h-48'>
            pp
          </div>
          <div className='flex px-20'>
            <div className="w-1/4 p-4">
                <Filter />
            </div>
            <div className="w-3/4 p-4">
                {trainOptions.map(option => (
                    <TrainOption key={option.id} option={option} />
                ))}
            </div>
            </div>
        </div>
    );
}

export default Results;

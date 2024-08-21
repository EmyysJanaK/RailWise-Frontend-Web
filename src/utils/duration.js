export const calculateDuration = (start, end) => {
    const parseTime = (timeString) => {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
  
      if (modifier === "pm" && hours !== 12) {
        hours += 12;
      } else if (modifier === "am" && hours === 12) {
        hours = 0;
      }
  
      return { hours, minutes };
    };
  
    const startTime = parseTime(start);
    const endTime = parseTime(end);
  
    const startDate = new Date();
    startDate.setHours(startTime.hours, startTime.minutes);
  
    const endDate = new Date();
    endDate.setHours(endTime.hours, endTime.minutes);
  
    const diff = endDate - startDate;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
  };
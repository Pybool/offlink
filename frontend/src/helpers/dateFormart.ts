export const formatDate = (date: any) => {
    const dateObject = new Date(date);

    const options = {
      day: '2-digit' as const,
      month: '2-digit' as const,
      year: 'numeric' as const,
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
    
  };
  
export const formatTime = (date: any) => {
    const dateObject = new Date(date);
    const options = {
      hour: 'numeric' as const,
      minute: 'numeric' as const,
      hour12: true,
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(dateObject);
  };
  

  
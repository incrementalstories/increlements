const renderTime = (secondsSinceMidnight: number): string => {
  const hours = Math.floor(secondsSinceMidnight / 3600);
  const minutes = Math.floor((secondsSinceMidnight % 3600) / 60);
  const seconds = Math.floor(secondsSinceMidnight) % 60;

  return (
    `${(`0${hours}`).substr(-2)
    }:${
      (`0${minutes}`).substr(-2)
    }:${
      (`0${seconds}`).substr(-2)}`
  );
};

export default renderTime;

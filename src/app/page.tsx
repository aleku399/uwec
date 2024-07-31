"use client";

import dynamic from 'next/dynamic';
import {useState, useEffect} from "react";

const Home = dynamic(() => import('@/components/Home'), { ssr: false });

const Map = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Home />
    </div>
  );
};

export default Map;

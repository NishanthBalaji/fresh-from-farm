import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductListSkeleton from './ProductListSkeleton';
import './ProductList.css'
import HomeSkeleton from './HomeSkeleton.jsx';
import ShowProductSkeleton from './ShowProductSkeleton.jsx';
import AddEditSkeleton from './AddEditSkeleton.jsx';



function AppWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  const fullUrl = window.location.href;

  const neededUrl = fullUrl.slice(22)

  // console.log('need - ', neededUrl);
  useEffect(() => {
    // Simulating loading delay
    setTimeout(() => {
      setIsLoaded(true); // After the timeout, load the actual app
    }, 1000); // Adjust the delay as per your preference
  }, []);
  if (neededUrl[0] === 'p') {
    return isLoaded ? <App /> : <ProductListSkeleton />;
  }
  else if (neededUrl[0] === 's') {
    return isLoaded ? <App /> : <ShowProductSkeleton />;
  }
  else if (neededUrl[0] === 'a' || neededUrl[0] === 'e') {
    return isLoaded ? <App /> : <AddEditSkeleton />;
  }
  else if (neededUrl.length === 0) {
    return isLoaded ? <App /> : <HomeSkeleton />;
  }

  else {
    return <App />
  }

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)



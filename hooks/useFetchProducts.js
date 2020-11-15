import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const getProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const { products } = response.data;
        
        if (mounted) {
          setProducts(products);      
        }
        
      } catch (error) {
        /* istanbul ignore next */ 
        if (mounted) {
          setError(true);      
        }
      }
    }

    getProducts();

    return () => mounted = false;
  }, []);

  return { products, error };
};
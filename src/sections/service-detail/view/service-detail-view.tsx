import type { ServiceItemProps } from 'src/model/response/service';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import serviceApi from 'src/api/serviceApi';
import { HomeContent } from 'src/layouts/home';

import { ServiceDetailItem } from '../service-detail-card';


export function ServiceDetailView() {
    const { id } = useParams<{ id: string }>(); 
    const [product, setProducts] = useState<ServiceItemProps | null>(null); 
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await serviceApi.getServiceById(id);
          const productData = response?.data; 
          setProducts(productData); 
          console.log('Successfully fetched product:', productData);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
  
      fetchProduct(); 
    }, [id]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <HomeContent>
        <ServiceDetailItem product={product} />
      </HomeContent>
    );
  }
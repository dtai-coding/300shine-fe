import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import serviceApi from 'src/api/serviceApi';

import type { ServiceItemProps } from 'src/model/response/service';

import { HomeContent } from 'src/layouts/home';

import { ServiceDetailItem } from '../service-detail-card';


export function ServiceDetailView() {
    const { id } = useParams<{ id: string }>(); // Assuming id is a string
    const [product, setProducts] = useState<ServiceItemProps | null>(null); // Change undefined to null
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await serviceApi.getServiceById(id); // Gọi API với id
          const productData = response?.data.value.data; // Lấy dữ liệu từ API
          setProducts(productData); // Cập nhật state
          console.log('Successfully fetched product:', productData);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
  
      fetchProduct(); // Gọi API khi component được render
    }, [id]);
  
    // Kiểm tra nếu product là null (chưa tải xong) thì hiển thị Loading...
    if (!product) {
      return <div>Loading...</div>;
    }
  
    // Khi product đã có dữ liệu, truyền vào ServiceDetailItem
    return (
      <HomeContent>
        <ServiceDetailItem product={product} />
      </HomeContent>
    );
  }
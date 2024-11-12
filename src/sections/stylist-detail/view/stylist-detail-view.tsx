import type { StylistItemProps } from 'src/model/response/stylist';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import stylistApi from 'src/api/stylistApi';
import { HomeContent } from 'src/layouts/home';

import { StylistDetailItem } from '../stylist-detail-card';


export function StylistDetailView() {
    const { id } = useParams<{ id: string }>(); // Assuming id is a string
    const [stylist, setStylist] = useState<StylistItemProps | null>(null); // Change undefined to null
  
    useEffect(() => {

      const fetchProduct = async () => {
        try {
            console.log(id);
          const response = await stylistApi.getStylistById(id); // Gọi API với id
          const stylistData = response?.data; // Lấy dữ liệu từ API
          setStylist(stylistData); // Cập nhật state
          console.log('Successfully fetched product:', stylistData);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      };
  
      fetchProduct(); // Gọi API khi component được render
    }, [id]);
  
    // Kiểm tra nếu product là null (chưa tải xong) thì hiển thị Loading...
    if (!stylist) {
      return <div>Loading...</div>;
    }
  
    // Khi product đã có dữ liệu, truyền vào ServiceDetailItem
    return (
      <HomeContent>
        <StylistDetailItem stylist={stylist} />
      </HomeContent>
    );
  }
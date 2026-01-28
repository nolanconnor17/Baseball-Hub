import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStadiumById } from '../services/api';

function StadiumDetail() {
  const { venueId } = useParams();
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const data = await getStadiumById(venueId);
        console.log('Full stadium data:', data.venues[0]);
        setStadium(data.venues?.[0] || null);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching stadium:', error);
        setLoading(false);
      }
    };

    fetchStadium();
  }, [venueId]);

  if (loading) {
    return <div>Loading stadium info...</div>;
  }

  if (!stadium) {
    return <div>Stadium not found</div>;
  }

  return (
    <div className="stadium-detail">
      <h1>{stadium.name}</h1>
      
      <div className="stadium-info">
        {stadium.location?.city && (
          <p><strong>Location:</strong> {stadium.location.city}, {stadium.location.state}</p>
        )}
        {stadium.location?.address1 && (
          <p><strong>Address:</strong> {stadium.location.address1}</p>
        )}
        {stadium.season && (
          <p><strong>Opened:</strong> {stadium.season}</p>
        )}
        
        {stadium.fieldInfo?.capacity && (
          <p><strong>Capacity:</strong> {stadium.fieldInfo.capacity.toLocaleString()}</p>
        )}
        {stadium.fieldInfo?.turfType && (
          <p><strong>Surface:</strong> {stadium.fieldInfo.turfType}</p>
        )}
        {stadium.fieldInfo?.roofType && (
          <p><strong>Roof:</strong> {stadium.fieldInfo.roofType}</p>
        )}
        
        {(stadium.fieldInfo?.leftLine || stadium.fieldInfo?.center || stadium.fieldInfo?.rightLine) && (
          <div>
            <p><strong>Field Dimensions:</strong></p>
            <p style={{marginLeft: '20px'}}>
              Left Field: {stadium.fieldInfo.leftLine}' | 
              Center Field: {stadium.fieldInfo.center}' | 
              Right Field: {stadium.fieldInfo.rightLine}'
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StadiumDetail;
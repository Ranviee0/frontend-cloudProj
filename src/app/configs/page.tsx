'use client'

import { useEffect, useState, ReactNode } from 'react';
import api from '../../utils/api';

const ConfigTablePage = () => {
  const [configData, setConfigData] = useState<any[]>([]);

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await api.get('/read/configs');
        setConfigData(response.data);
      } catch (error) {
        console.error('Error fetching config data:', error);
      }
    };

    fetchConfigData();
  }, []);

  return (
    <div>
      <h1>Configuration Data</h1>
      {configData.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(configData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {configData.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{String(value) as ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConfigTablePage;

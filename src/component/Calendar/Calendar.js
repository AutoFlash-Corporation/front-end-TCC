import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Importando o estilo padrão
import styles from '../Calendar/calendar.module.css'; // Importando o estilo personalizado

const MyCalendar = () => {
  const [accessData, setAccessData] = useState([]);

  // Função para registrar a data de acesso
  const logUserAccess = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Ex: "2024-11-22"
    localStorage.setItem('lastAccess', currentDate); // Salva no localStorage ou banco de dados
  };

  // Carrega os dados de acesso do localStorage e atualiza o estado
  useEffect(() => {
    logUserAccess(); // Registra o acesso sempre que o componente for carregado

    const storedAccessData = localStorage.getItem('lastAccess');
    if (storedAccessData) {
      setAccessData([{ date: storedAccessData, count: 1 }]); // Exemplo de dados formatados
    }
  }, []);

  return (
    <div className={styles.CalendarGroup}>
      <CalendarHeatmap
        startDate={new Date('2024-11-01')}
        endDate={new Date('2025-11-30')}
        values={accessData}
      />
    </div>
  );
};

export default MyCalendar;
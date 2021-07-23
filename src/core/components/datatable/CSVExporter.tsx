import React from 'react';
import CsvDownloader from 'react-csv-downloader';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

export type CSVColumn = { id: string; displayName: string };

interface CSVExporterProps {
  datas: any[];
  columns: CSVColumn[];
  fileName?: string;
  disabled?: boolean;
}
export const CSVExporter: React.FC<CSVExporterProps> = ({
  datas,
  columns,
  fileName = 'download',
  disabled = false,
}) => {
  return (
    <CsvDownloader filename={fileName} datas={datas} columns={columns}>
      <IconButton disabled={disabled}>
        <GetAppIcon />
      </IconButton>
    </CsvDownloader>
  );
};

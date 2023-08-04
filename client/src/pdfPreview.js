// PdfPreview.js
import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfPreview = ({ url }) => {
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchPdfBlob = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        setNumPages(blob ? 1 : null);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setNumPages(null);
      }
    };

    fetchPdfBlob();
  }, [url]);

  return (
    <div>
      {numPages ? (
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Failed to load PDF preview.</p>
      )}
    </div>
  );
};

export default PdfPreview;

// src/components/ui/table.jsx

import React from 'react';

// Main Table container
export const Table = ({ children, className }) => (
  <table className={`min-w-full border-collapse ${className || ''}`}>{children}</table>
);

// Table header row
export const TableHeader = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

// Table header cell
export const TableHead = ({ children, className }) => (
  <th className={`px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 ${className || ''}`}>
    {children}
  </th>
);

// Table body
export const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);

// Table row
export const TableRow = ({ children, className }) => (
  <tr className={`border-b border-gray-200 dark:border-gray-700 ${className || ''}`}>{children}</tr>
);

// Table cell
export const TableCell = ({ children, className }) => (
  <td className={`px-4 py-2 text-gray-900 dark:text-gray-100 ${className || ''}`}>{children}</td>
);

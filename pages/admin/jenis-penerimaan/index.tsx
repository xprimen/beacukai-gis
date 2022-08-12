import React from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Tooltip,
  Link as LinkNB,
} from 'native-base';
import { NextPage } from 'next';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useTable } from 'react-table';
import LayoutAdmin from '../../../layouts/Admin/LayoutAdmin';

interface Props {
  data?: object;
}

interface RowOriginalInterface {
  id: number;
  nama: string;
  warna: string;
}

const jenisPenerimaan: NextPage<Props> = ({ data }) => {
  const columns: object[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value }: { value: string }) => <Center>{value}</Center>,
      },
      {
        Header: 'Penerimaan',
        accessor: 'nama',
      },
      {
        Header: 'Warna',
        accessor: 'warna',
        Cell: ({ value }: { value: string }) => <Center>{value}</Center>,
      },
      {
        Header: 'Opsi',
        Cell: ({
          row: { original },
        }: {
          row: { original: RowOriginalInterface };
        }) => {
          return (
            <HStack alignItems="center" justifyContent="center" space={1}>
              <Link href={`/admin/jenis-penerimaan/${original.id}`} passHref>
                <a>
                  <Tooltip label="Edit" placement="top">
                    <IconButton
                      size="xs"
                      colorScheme="success"
                      color="white"
                      variant="solid"
                      icon={<FaEdit size={12} />}
                    />
                  </Tooltip>
                </a>
              </Link>
              <Link href={`/admin/jenis-penerimaan/${original.id}`} passHref>
                <a>
                  <Tooltip label="Hapus" placement="top">
                    <IconButton
                      size="xs"
                      colorScheme="danger"
                      color="white"
                      variant="solid"
                      icon={<FaTrash size={12} />}
                    />
                  </Tooltip>
                </a>
              </Link>
            </HStack>
          );
        },
      },
    ],
    []
  );
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <LayoutAdmin>
      <Heading size="md" mb="4">
        Data Jenis Penerimaan
      </Heading>
      <Box>
        <table className="table-data" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index1) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index1}>
                {headerGroup.headers.map((column, index2) => (
                  <th {...column.getHeaderProps()} key={index2}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </LayoutAdmin>
  );
};

export default jenisPenerimaan;

jenisPenerimaan.getInitialProps = async () => {
  /* const res = await fetch('https://dummyapi.io/data/v1/user?page=2&limit=10', {
    method: 'get',
    headers: {
      'app-id': '62eec69e372985d6758ee6ed',
    },
  });
  const json = await res.json();
  return { data: json }; */
  const data = [
    {
      id: 1,
      nama: 'Bea Masuk',
      warna: 'merah',
    },
    {
      id: 2,
      nama: 'Bea Keluar',
      warna: 'hijau',
    },
    {
      id: 3,
      nama: 'Cukai',
      warna: 'kuning',
    },
    {
      id: 4,
      nama: 'Komoditi',
      warna: 'biru',
    },
  ];

  return { data };
};

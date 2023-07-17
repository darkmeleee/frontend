

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Имя",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "number",
    headerName: "Телефон",
    width: 230,
  },

  {
    field: "spent",
    headerName: "Заказы",
    width: 100,
  },
  {
    field: "status",
    headerName: "Состояние",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];


//temporary da
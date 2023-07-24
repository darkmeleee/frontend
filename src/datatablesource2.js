export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Название",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imageUrl} alt="pirog image"></img>
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Стоимость (₽)",
      width: 230,
    },
  
    {
      field: "type",
      headerName: "Категория",
      width: 100,
    },
    {
      field: "description",
      headerName: "Описание",
      width: 230,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.description}`}>
            {params.row.description}
          </div>
        );
      },
    },
  ];
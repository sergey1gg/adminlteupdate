import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dependensList, editDependens, editGroup, editMenu, editProduct, groupList, menuList, productList } from '../../actions/menu-api';
import $ from 'jquery';
import 'datatables.net-bs4';
import "datatables.net-responsive-bs4";
const PositionItems = ({ rowId }) => {
  const dispatch = useDispatch();
  const positions=useSelector(s=>s.menu.group)

  useEffect(() => {
    dispatch(groupList(rowId)).then((res)=>{

    });
  }, []);
  const [selectedRow, setSelectedRow] = useState(null);

  const [editingRowGroup, setEditingRowGroup] = useState(null);
  const [editedNameGroup, setEditedNameGroup] = useState('');
  const [editedPictureGroup, setEditedPictureGroup] = useState('');
  const [editedNoteGroup, setEditedNoteGroup] = useState('');
  const [editedActiveGroup, setEditedActiveGroup] = useState('');
  const [currentIdGroup, setCurrentIdGroup] = useState('');

  const handleEditGroup = (index, id, data_name, data_picture, data_owner, data_active) => {
    setEditingRowGroup(index);
    setEditedNameGroup(data_name);
    setEditedPictureGroup(data_picture);
    setEditedNoteGroup(data_owner);
    setEditedActiveGroup(data_active);
    setCurrentIdGroup(id);
  };

  const handleSaveGroup = () => {
    dispatch(editGroup(currentIdGroup, rowId, editedNameGroup,editedActiveGroup,editedPictureGroup,editedNoteGroup))
    setEditingRowGroup(null);
  };
  const handleShowProduct = (index, rowId, groupId) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
      //dispatch(productList(rowId, groupId));
    }
  };

  const positionItems = positions?.map((row, index) => (
    <React.Fragment key={row.id}>
    <tr>
      <td onClick={() => handleShowProduct(index, rowId, row.id)}>{row.id}</td>
      <td onClick={() => handleShowProduct(index, rowId, row.id)}>
        {editingRowGroup === index ? (
          <input
            type="text"
            size={editedNameGroup.length}
            value={editedNameGroup}
            onChange={(e) => setEditedNameGroup(e.target.value)}
          />
        ) : (
          <span>
            {row.name}
          </span>
        )}
      </td>
      <td onClick={() => handleShowProduct(index, rowId, row.id)}>
        {editingRowGroup === index ? (
          <input
          size={editedPictureGroup.length}
            type="text"
            value={editedPictureGroup}
            onChange={(e) => setEditedPictureGroup(e.target.value)}
          />
        ) : (
          <span>
            {row.picture}
          </span>
        )}
      </td>
      <td onClick={() => handleShowProduct(index, rowId, row.id)}>
        {editingRowGroup === index ? (
          <input
            type="text"
            size={editedNoteGroup.length}
            value={editedNoteGroup}
            onChange={(e) => setEditedNoteGroup(e.target.value)}
          />
        ) : (
          <span>
            {row.note}
          </span>
        )}
      </td>
      <td>
  {editingRowGroup === index ? (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`switch-${index}`}
        checked={editedActiveGroup === 1}
        onChange={(e) => setEditedActiveGroup(e.target.checked ? 1 : 0)}
      />
      <label className="custom-control-label" htmlFor={`switch-${index}`}>
      </label>
    </div>
  ) : (
    <span>
      <div className={`custom-control custom-switch ${row.active === 1 ? 'custom-switch-on' : 'custom-switch-off'}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          disabled
          checked={row.active === 1}
        />
        <label className="custom-control-label">
        </label>
      </div>
    </span>
  )}
</td>
      <td>
        {editingRowGroup === index ? (
          <button type="button" className="btn btn-success btn-sm" onClick={handleSaveGroup}>
            Save
          </button>
        ) : (
          <button
            data-index={index}
            type="button"
            className="btn btn-info btn-sm btn-show-edit-group"
            onClick={() => handleEditGroup(
              index,
              row.id,
              row.name,
              row.picture,
              row.note,
              row.active
            )}
          >
            <i className="fa fa-eye"></i> Edit
          </button>
        )}
      </td>
    </tr>
    {selectedRow === index && <Product rowId={rowId} groupId={row.id} />}
    </React.Fragment>
  ));

  return (

    <tr>
      <td colSpan="8">
        <div className="table-responsive">
          <table id="example3" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Picture</th>
                <th>Description</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {positionItems}
            </tbody>
          </table>
        </div>
      </td>
    </tr>

  );
};
const Product = ({ rowId, groupId }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.menu.product);

  useEffect(() => {
    dispatch(productList(groupId));
  }, [dispatch, groupId]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [editingRowProduct, setEditingRowProduct] = useState(null);
  const [editedNameProduct, setEditedNameProduct] = useState('');
  const [editedPictureProduct, setEditedPictureProduct] = useState('');
  const [editedDescriptionProduct, setEditedDescriptionProduct] = useState('');
  const [editedActiveProduct, setEditedActiveProduct] = useState('');
  const [editedTovarProduct, setEditedTovarProduct] = useState('');
  const [editedPriceProduct, setEditedPriceProduct] = useState('');
  const [currentIdProduct, setCurrentIdProduct] = useState('');

  const handleEditProduct = (index, id, data_name, data_picture, data_description, data_tovar,data_price, data_active) => {
    setEditingRowProduct(index);
    setEditedNameProduct(data_name);
    setEditedPictureProduct(data_picture);
    setEditedDescriptionProduct(data_description);
    setEditedTovarProduct(data_tovar)
    setEditedPriceProduct(data_price)
    setEditedActiveProduct(data_active);
    setCurrentIdProduct(id);
  };

  const handleSaveProduct = () => {
    dispatch(editProduct(currentIdProduct,groupId,editedNameProduct,editedDescriptionProduct,editedTovarProduct,editedPictureProduct,editedPriceProduct,editedActiveProduct))
    setEditingRowProduct(null);
  };

  const handleShowDep = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const productItems = products?.map((row, index) => (
    <React.Fragment key={row.id}>
    <tr >
      <td onClick={() => handleShowDep(index)}>{row.id}</td>
      <td onClick={() => handleShowDep(index)}>
        {editingRowProduct === index ? (
          <input
            type="text"
            size={editedNameProduct.length}
            value={editedNameProduct}
            onChange={(e) => setEditedNameProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.name}
          </span>
        )}
      </td>
      <td onClick={() => handleShowDep(index)}>
        {editingRowProduct === index ? (
          <input
          size={editedPictureProduct.length}
            type="text"
            value={editedPictureProduct}
            onChange={(e) => setEditedPictureProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.picture}
          </span>
        )}
      </td>
      <td onClick={() => handleShowDep(index)}>
        {editingRowProduct === index ? (
          <input
          size={editedDescriptionProduct.length}
            type="text"
            value={editedDescriptionProduct}
            onChange={(e) => setEditedDescriptionProduct(e.target.value)}
          />
        ) : (
          <span >
            {row.note}
          </span>
        )}
      </td>
      <td onClick={() => handleShowDep(index)}>
        {editingRowProduct === index ? (
          <input
          size={editedTovarProduct.toString().length}
            type="text"
            value={editedTovarProduct}
            onChange={(e) => setEditedTovarProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.tovar}
          </span>
        )}
      </td>
      <td onClick={() => handleShowDep(index)}>
        {editingRowProduct === index ? (
          <input
          size={editedPriceProduct.toString().length}
            type="text"
            value={editedPriceProduct}
            onChange={(e) => setEditedPriceProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.price}
          </span>
        )}
      </td>
      <td>
  {editingRowProduct === index ? (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`switch-${index}`}
        checked={editedActiveProduct === 1}
        onChange={(e) => setEditedActiveProduct(e.target.checked ? 1 : 0)}
      />
      <label className="custom-control-label" htmlFor={`switch-${index}`}>
      </label>
    </div>
  ) : (
    <span>
      <div className={`custom-control custom-switch ${row.active === 1 ? 'custom-switch-on' : 'custom-switch-off'}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          disabled
          checked={row.active === 1}
        />
        <label className="custom-control-label">
        </label>
      </div>
    </span>
  )}
</td>

      <td>
        {editingRowProduct === index ? (
          <button type="button" className="btn btn-success btn-sm" onClick={handleSaveProduct}>
            Save
          </button>
        ) : (
          <button
            data-index={index}
            type="button"
            className="btn btn-info btn-sm btn-show-edit-product"
            onClick={() => handleEditProduct(
              index,
              row.id,
              row.name,
              row.picture,
              row.note,
              row.tovar,
              row.price,
              row.active
            )}
          >
            <i className="fa fa-eye"></i> Edit
          </button>
        )}
      </td>
    </tr>
          {selectedRow === index && <Dependencies productId={row.id} />}
          </React.Fragment>
  ));

  return (
    <React.Fragment>
    <tr>
      <td colSpan="8">
        <div className="table-responsive">
          <table id="example3" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Picture</th>
                <th>Description</th>
                <th>Tovar</th>
                <th>Price</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productItems}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
    </React.Fragment>
  );
};


export const Menu = () => {
  const menu = useSelector(state => state.menu.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menuList());
  }, []);

  const [editingRow, setEditingRow] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedActive, setEditedActive] = useState('');
  const [currentId, setCurrentId] = useState('');

  const handleEdit = (index, id, name, active) => {
    setEditingRow(index);
    setEditedName(name);
    setEditedActive(active);
    setCurrentId(id);
  };

  const handleSave = () => {
    dispatch(editMenu(currentId, editedName, editedActive));
    setEditingRow(null);

  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleShowPositions = (index, rowId) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const items = menu?.map((row, index) => (
    <React.Fragment key={row.id}>
      <tr>
        <td onClick={() => handleShowPositions(index, row.id)}>{row.id}</td>
        <td onClick={() => handleShowPositions(index, row.id)}>
          {editingRow === index ? (
            <input
              size={editedName.length}
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <span>
              {row.name}
            </span>
          )}
        </td>
        <td onClick={() => handleShowPositions(index, row.id)}>
          <span>
            {row.owner}
          </span>
        </td>
        <td>
  {editingRow === index ? (
    <div className="custom-control custom-switch">
      <input 
        type="checkbox"
        className="custom-control-input"
        id={`switch-${index}`}
        checked={editedActive === 1}
        onChange={(e) => setEditedActive(e.target.checked ? 1 : 0)}
      />
      <label className="custom-control-label" htmlFor={`switch-${index}`}>
      </label>
    </div>
  ) : (
    <span>
      <div className={`custom-control custom-switch ${row.active === 1 ? 'custom-switch-on' : 'custom-switch-off'}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          disabled
          checked={row.active === 1}
        />
        <label className="custom-control-label">
        </label>
      </div>
    </span>
  )}
</td>

        <td>
          {editingRow === index ? (
            <button type="button" className="btn btn-success btn-sm" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              data-index={index}
              type="button"
              className="btn btn-info btn-sm btn-show-edit"
              onClick={() => handleEdit(index, row.id, row.name, row.active)}
            >
              <i className="fa fa-eye"></i> Edit
            </button>
          )}
        </td>
      </tr>
      {/* Проверяем, соответствует ли текущая строка выбранной */}
      {selectedRow === index && <PositionItems rowId={row.id} />}
    </React.Fragment>
  ));

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Menu</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <button className='btn  btn-primary'>+ Add menu</button>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* /.card */}
              <div className="card">
                <div className="card-header">
                  <div className="col-sm-12 col-md-6">
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example3" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Name</th>
                          <th>Owner</th>
                          <th>Active</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items}
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};





const Dependencies = ({ rowId, groupId,productId }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.menu.dependens);

  useEffect(() => {
    dispatch(dependensList(productId));
  }, [dispatch, productId]);

  const [editingRowProduct, setEditingRowProduct] = useState(null);
  const [editedNameProduct, setEditedNameProduct] = useState('');
  const [editedPictureProduct, setEditedPictureProduct] = useState('');
  const [editedDescriptionProduct, setEditedDescriptionProduct] = useState('');
  const [editedActiveProduct, setEditedActiveProduct] = useState('');
  const [editedTovarProduct, setEditedTovarProduct] = useState('');
  const [editedPriceProduct, setEditedPriceProduct] = useState('');
  const [currentIdProduct, setCurrentIdProduct] = useState('');

  const handleEditProduct = (index, id, data_name, data_picture, data_description, data_tovar,data_price, data_active) => {
    setEditingRowProduct(index);
    setEditedNameProduct(data_name);
    setEditedPictureProduct(data_picture);
    setEditedDescriptionProduct(data_description);
    setEditedTovarProduct(data_tovar)
    setEditedPriceProduct(data_price)
    setEditedActiveProduct(data_active);
    setCurrentIdProduct(id);
  };

  const handleSaveProduct = () => {
    dispatch(editDependens(currentIdProduct,productId,editedNameProduct,editedDescriptionProduct,editedTovarProduct,editedPictureProduct,editedPriceProduct,editedActiveProduct))
    setEditingRowProduct(null);
  };

  const productItems = products?.map((row, index) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>
        {editingRowProduct === index ? (
          <input
          size={editedNameProduct.length}
            type="text"
            value={editedNameProduct}
            onChange={(e) => setEditedNameProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.name}
          </span>
        )}
      </td>
      <td>
        {editingRowProduct === index ? (
          <input
          size={editedPictureProduct.length}
            type="text"
            value={editedPictureProduct}
            onChange={(e) => setEditedPictureProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.picture}
          </span>
        )}
      </td>
      <td>
        {editingRowProduct === index ? (
          <input
          size={editedDescriptionProduct.length}
            type="text"
            value={editedDescriptionProduct}
            onChange={(e) => setEditedDescriptionProduct(e.target.value)}
          />
        ) : (
          <span >
            {row.note}
          </span>
        )}
      </td>
      <td>
        {editingRowProduct === index ? (
          <input
          size={editedTovarProduct.toString().length}
            type="text"
            value={editedTovarProduct}
            onChange={(e) => setEditedTovarProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.tovar}
          </span>
        )}
      </td>
      <td>
        {editingRowProduct === index ? (
          <input
          size={editedPriceProduct.toString().length}
            type="text"
            value={editedPriceProduct}
            onChange={(e) => setEditedPriceProduct(e.target.value)}
          />
        ) : (
          <span>
            {row.price}
          </span>
        )}
      </td>
      <td>
  {editingRowProduct === index ? (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`switch-${index}`}
        checked={editedActiveProduct === 1}
        onChange={(e) => setEditedActiveProduct(e.target.checked ? 1 : 0)}
      />
      <label className="custom-control-label" htmlFor={`switch-${index}`}>
      </label>
    </div>
  ) : (
    <span>
      <div className={`custom-control custom-switch ${row.active === 1 ? 'custom-switch-on' : 'custom-switch-off'}`}>
        <input
          type="checkbox"
          className="custom-control-input"
          disabled
          checked={row.active === 1}
        />
        <label className="custom-control-label">
        </label>
      </div>
    </span>
  )}
</td>

      <td>
        {editingRowProduct === index ? (
          <button type="button" className="btn btn-success btn-sm" onClick={handleSaveProduct}>
            Save
          </button>
        ) : (
          <button
            data-index={index}
            type="button"
            className="btn btn-info btn-sm btn-show-edit-product"
            onClick={() => handleEditProduct(
              index,
              row.id,
              row.name,
              row.picture,
              row.note,
              row.tovar,
              row.price,
              row.active
            )}
          >
            <i className="fa fa-eye"></i> Edit
          </button>
        )}
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
    <tr>
      <td colSpan="8">
        <div className="table-responsive">
          <table id="example3" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Name</th>
                <th>Picture</th>
                <th>Description</th>
                <th>Tovar</th>
                <th>Price</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productItems}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
    </React.Fragment>
  );
};
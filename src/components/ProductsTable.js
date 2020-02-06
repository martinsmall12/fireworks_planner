import React, {forwardRef} from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import YouTube from '@u-wave/react-youtube';

import parser from "papaparse";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class ProductsTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state = {tableData: []};
    }

    handleSubmit(event) {
        event.preventDefault();

        const parseData = (content) => {
            return new Promise((resolve) => {
                parser.parse(content, {
                    header: true,
                    complete: (results) => {
                        resolve(results);
                    }
                });
            });
        };


        parseData(this.fileInput.current.files[0]).then(results => this.setState({tableData: results.data}));

    }

    render() {

        return <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" ref={this.fileInput}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <MaterialTable
                title="Přehled produktů"
                columns={[
                    {
                        title: '',
                        field: 'image',
                        render: rowData => (
                            <img
                                style={{height: 46, borderRadius: '50%'}}
                                src={rowData.image}
                            />
                        ),
                    },
                    {title: 'Kód produktu', field: 'number'},
                    {title: 'Název', field: 'name'},
                    {title: 'Kategorie', field: 'category'},
                    {title: 'Kalibr', field: 'caliber'},
                    {title: 'Počet ran', field: 'shots'},
                    {title: 'Slož(g)', field: 'nec'},
                    {title: 'Čas', field: 'duration'},
                    {title: 'Délka tuby', field: 'tubeLength'},
                    {title: 'Efekty', field: 'effectType'},
                    {title: 'Cena', field: 'price'},
                ]}
                data={this.state.tableData}
                detailPanel={rowData => {
                    return (
                        <YouTube
                            key={`list-${rowData.number}`}
                            index={rowData.number}
                            video={rowData.videoUrl}
                            autoplay={false}
                            width="560"
                            height="330"
                            showCaptions={false}
                            showInfo={false}
                            controls={false}
                            disableKeyboard={true}
                            annotations={false}
                            showRelatedVideos={false}
                            modestBranding={true}
                        />
                    )
                }}
                editable={{
                    isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
                    isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    /* const data = this.state.data;
                                    data.push(newData);
                                    this.setState({ data }, () => resolve()); */
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    /* const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({ data }, () => resolve()); */
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    /* let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve()); */
                                }
                                resolve();
                            }, 1000);
                        })
                }}
                icons={tableIcons}
                options={{
                    search: true,
                    filtering: true,
                    selection: true
                }}
            />
        </div>
    };
}

export default ProductsTable

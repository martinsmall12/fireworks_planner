import React from 'react';
import {connect} from "react-redux";
import {path} from 'ramda';
import Grid from '@material-ui/core/Grid';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const HandleRow = SortableHandle(({value}) => (
    <DragHandleIcon color="secondary"/>
));

const SortableItem = SortableElement(({value}) => (
    <ListItem tabIndex={0}>
        <Grid item xs={1}>
            <HandleRow value={value}/>
        </Grid>
        <Grid item xs={1}>
            <Typography variant="body1">
                {value.id}
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="body1">
                {value.name}
            </Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography variant="body1">
                {value.shots}
            </Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography variant="body1">
                {value.duration}
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="body1">
                {value.start}
            </Typography>
        </Grid>
    </ListItem>
));

const SortableList = SortableContainer(({items, list}) => {
    return (
        <Grid item xs={4}>
            <Paper>
                <Typography variant="h3">
                    {list.title}
                </Typography>
                <List>
                    <ListItem tabIndex={0}>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1">
                                P
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1">
                                Název
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1">
                                Počet ran
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1">
                                Délka
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body1">
                                Začátek
                            </Typography>
                        </Grid>
                    </ListItem>
                    {items.map((item, index) => (
                        <SortableItem key={`item-${item.id}`} index={index} value={item} shou/>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
});

const SortableLists = ({lists}) => {
    return (
        <Grid container spacing={2}>
            {lists.map((list, index) => (
                <SortableList key={`list-${list.id}`} index={index} items={list.cards} list={list} useDragHandle/>
            ))}
        </Grid>
    );
};




class FirePlan extends React.Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        console.log('zavola se redux akce, která změní pořadí prvků ve storu')
    };


    render() {
        const {board} = this.props;
        return (
            <div>
                <SortableLists lists={board.lanes}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    board: path(['app', 'board'], state),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FirePlan);

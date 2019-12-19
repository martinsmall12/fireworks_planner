import React, {cloneElement, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import {path, compose, map} from 'ramda';
import Grid from '@material-ui/core/Grid';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import useForm from 'react-hook-form';

import Player from "./Player";
import {effectInFirePosition} from "../utils";
import { getScenes, getSites, getEntities, getEffectsAllIds, getSitesInSceneWithEffects, getSiteInScene } from '../selectors';
import { addSite } from '../actions/sites';
import { addScene } from '../actions/scenes';
import { addEffect } from '../actions/effects';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));



const HandleRow = SortableHandle(({value}) => (
    <DragHandleIcon color="secondary"/>
));

const SortableItem = SortableElement(({value, pos}) => (
    <ListItem tabIndex={0} selected={effectInFirePosition(pos, value)}>
        <Grid item xs={1}>
            <HandleRow value={value}/>
        </Grid>
        <Grid item xs={1}>
            <Typography variant="body1">
                {value.position}
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

const SortableList = SortableContainer(({items, list, pos, dispatch}) => {
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
                        <SortableItem key={`item-${item.id}`} index={index} value={item} pos={pos} shou/>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
});

const SortableLists = ({lists, pos, dispatch}) => {
    return (
        <Grid container spacing={2}>
            {lists.map((list, index) => (
                <SortableList key={`list-${list.id}`} index={index} items={list.effects} list={list} pos={pos} dispatch={dispatch} useDragHandle/>
            ))}
        </Grid>
    );
};




// class FirePlan extends React.Component {
//     onSortEnd = ({oldIndex, newIndex}) => {
//         console.log('zavola se redux akce, která změní pořadí prvků ve storu')
//     };
//
//
//     render() {
//         const {sitesInSceneWithEffects, addSites, addScenes, pos} = this.props;
//         return (
//
//         );
//     }
// }

const FirePlan = ({pos}) => {
    const sitesInSceneWithEffects = useSelector( getSitesInSceneWithEffects('scene1'));
    //const getSiteInScene = useSelector( getSiteInScene('scene1'));
    const dispatch = useDispatch();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const saveSite = (data, e) => {
        dispatch(addSite('scene1', data.siteLabel))
    };

    const saveEffect = (data, e) => {
        dispatch(addEffect(data.siteId, data.effectName))
    };

    return <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(saveSite)} >
            <TextField name="siteLabel" label="Site label" inputRef={register}/>
            <Button type="submit">Add Site</Button>
        </form>
        <Button onClick={handleClickOpen}>Open select dialog</Button>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Fill the form</DialogTitle>
            <DialogContent>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(saveEffect)} >
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"

                            input={<Input />}
                        >
                            {sitesInSceneWithEffects.map((e, keyIndex) => {
                                return (<MenuItem  name="siteId" key={keyIndex} value={e.id}  inputRef={register}>{e.title}</MenuItem>);
                            }) }
                        </Select>
                        <TextField name="effectName" label="effect name" inputRef={register}/>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleClose}>Add Effect</Button>
            </DialogActions>
        </Dialog>

        {sitesInSceneWithEffects &&
        <SortableLists lists={sitesInSceneWithEffects} pos={pos} dispatch={dispatch}/>
        }
    </div>
};

export default FirePlan

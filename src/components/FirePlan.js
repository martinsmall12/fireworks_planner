import React, {cloneElement, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from "@material-ui/core/NativeSelect";
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from 'react-hook-form';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { SortableList } from './SortableList';

import {effectInFirePosition, getStyleForPreviewPositions} from "../utils";
import {
    getSitesInSceneWithEffects,
    getEffectsInScene
} from '../selectors';
import {addSite} from '../actions/sites';
import {addEffect, removeEffectById} from '../actions/effects';
import YouTube from "@u-wave/react-youtube";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const SortableLists = ({lists, pos, removeEffect, onSortEnd}) => {
    return (
        <Grid container spacing={2}>
            {lists.map((list, index) => (
                <SortableList key={`list-${list.id}`} index={index} items={list.effects} list={list} pos={pos}
                              removeEffect={removeEffect} useDragHandle onSortEnd={onSortEnd}/>
            ))}
        </Grid>
    );
};


const FirePlan = ({pos}) => {
    const sitesInSceneWithEffects = useSelector(getSitesInSceneWithEffects('scene1'));
    const effectsInScene = useSelector(getEffectsInScene('scene1'));

    const dispatch = useDispatch();

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const onSortEnd = ({oldIndex, newIndex}) => {
        console.log(oldIndex + " " + newIndex);
        console.log('zavola se redux akce, která změní pořadí prvků ve storu')
        console.log(JSON.stringify(effectsInScene));

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const {register, handleSubmit, errors} = useForm(); // initialise the hook

    const saveSite = (data, e) => {
        dispatch(addSite('scene1', data.siteLabel))
    };

    const saveEffect = (data, e) => {
        dispatch(addEffect(data.siteId, data.effectName, data.videoUrl, data.previewPosition, data.duration, data.shots))
    };

    const removeEffect = (effectId, siteId) => {
        dispatch(removeEffectById(effectId, siteId));
    };

    return <div className={classes.root}>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(saveSite)}>
                <TextField name="siteLabel" label="Site label" inputRef={register}/>
                <Button type="submit">Add Site</Button>
            </form>
            <Button onClick={handleClickOpen}>Open select dialog</Button>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off" onSubmit={handleSubmit(saveEffect)}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                            <NativeSelect
                                label="native"
                                fullWidth
                                error={!!(errors && errors.siteId)}
                                inputRef={register({required: "required"})}
                                name="siteId"
                            >
                                {sitesInSceneWithEffects.map((e, keyIndex) => {
                                    return (<option key={keyIndex} value={e.id}>{e.title}</option>);
                                })}
                            </NativeSelect>
                            <TextField name="effectName" label="effect name" inputRef={register}/>
                            <TextField name="videoUrl" label="Video url" inputRef={register}/>
                            <TextField name="previewPosition" type="number" min="0" max="14" label="Preview position"
                                       inputRef={register}/>
                            <TextField name="duration" label="Duration" inputRef={register}/>
                            <TextField name="shots" label="shots" inputRef={register}/>
                            <Button type="submit" onClick={handleClose}>Add Effect</Button>
                        </FormControl>

                    </form>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>

            {sitesInSceneWithEffects &&
            <SortableLists lists={sitesInSceneWithEffects} pos={pos} removeEffect={removeEffect} onSortEnd={onSortEnd}/>
            }
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div>
                {effectsInScene.map((effect, index) => (
                    <Box position="fixed" display="none"
                         style={getStyleForPreviewPositions(effect, pos)}>
                        <YouTube
                            key={`list-${effect.id}`}
                            index={index}
                            video={effect.videoUrl}
                            autoplay={false}
                            width="100%"
                            height="100%"
                            showCaptions={false}
                            showInfo={false}
                            controls={false}
                            disableKeyboard={true}
                            annotations={false}
                            showRelatedVideos={false}
                            modestBranding={true}
                            play={effectInFirePosition(pos, effect)}
                            pause={!effectInFirePosition(pos, effect)}
                        />
                    </Box>
                ))}
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
        </TabPanel>
    </div>
};

export default FirePlan

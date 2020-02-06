import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import {effectInFirePosition} from "../utils";
import Button from "@material-ui/core/Button";
import DragHandleIcon from "@material-ui/core/SvgIcon/SvgIcon";

const HandleRow = SortableHandle(({value}) => (
    <DragHandleIcon color="secondary"/>
));
const SortableItem = SortableElement(({value, pos, removeEffect, list}) => (
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
        <Grid item xs={3}>
            <Typography variant="body1">
                <Button onClick={() => removeEffect(value.id, list.id)}>Smazat</Button>
            </Typography>
        </Grid>
    </ListItem>
));


export const SortableList = SortableContainer(({items, list, pos, removeEffect}) => {
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
                        <SortableItem key={`item-${item.id}`} index={index} value={item} pos={pos}
                                      removeEffect={removeEffect} list={list}/>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
});
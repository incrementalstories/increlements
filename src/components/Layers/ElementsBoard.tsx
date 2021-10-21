import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LayersModule, LayersState } from ".";

import "./ElementsBoard.css";
import {
  DISCOVER_WILL,
  Element,
  ElementsCollection,
  ElementsState,
  ElementState,
  FOCUS_WILL,
  forceGen,
  GEN_COST,
  Status,
} from "./elements";
import { Gauge } from "components/util/Gauge";
import { roundDP } from "components/util/roundDP";
import capitalizeFirstLetter from "components/util/capitalizeFirstLetter";

type DragElement = {
  merge: string;
  name: Element;
  action: string | false;
};

const Element = ({ name }: { name: Element }): ReactElement => {
  const dispatch = useDispatch();
  const { element } = useSelector((state: LayersState) => ({
    element: state.elements.elements[name],
  }));

  // const [{ isDragging }, drag] = useDrag(
  //   () => ({
  //     // "type" is required. It is used by the "accept" specification of drop targets.
  //     type: "MERGE",
  //     item: {
  //       merge: "element",
  //       name: name,
  //       action: element.merge,
  //     },
  //     canDrag: () => {
  //       return true;
  //     },
  //     isDragging: (monitor) => {
  //       return name === monitor.getItem().name;
  //     },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   }),
  //   [name, element.merge],
  // );

  // const [{ isOver, canDrop }, drop] = useDrop(
  //   () => ({
  //     accept: ["MERGE"],
  //     drop: (_, monitor) => {
  //       const item: DragElement = monitor.getItem();
  //       console.log("UI dropped " + JSON.stringify(item) + " onto " + name);
  //       dispatch({
  //         type: item.action,
  //         payload: { from: item.name, to: name },
  //       });
  //     },
  //     canDrop: (_, monitor) => {
  //       const src: DragElement = monitor.getItem();
  //       return src.name !== name;
  //     },
  //     collect: (monitor) => ({
  //       isOver: !!monitor.isOver(),
  //       canDrop: !!monitor.canDrop(),
  //     }),
  //   }),
  //   [name],
  // );

  switch (element.status) {
    case Status.HIDDEN:
    case Status.DISCOVERABLE:
      return null;
    case Status.ACTIVE:
    case Status.PASSIVE:
      return (
        <div style={{ display: "inline-block" }}>
          <Gauge
            value={element.value}
            max={element.max}
            label={roundDP(1)}
            className={name}
          >
            {capitalizeFirstLetter(name)}
          </Gauge>
        </div>
      );
  }
};

const Actions = (): ReactElement => {
  const dispatch = useDispatch();
  const { elements } = useSelector((state: LayersState) => ({
    elements: state.elements.elements,
  }));

  const ALL_ELEMENTS: Array<Element> = [
    "will",
    "air",
    "earth",
    "fire",
    "water",
  ];

  const discoverAction = (name: Element) => {
    switch (name) {
      case "will":
        return (
          <button
            key={"discover" + name}
            onClick={() => dispatch({ type: DISCOVER_WILL })}
          >
            Gather your thoughts
          </button>
        );
      case "air":
        return (
          <button
            key={"discover" + name}
            onClick={() => dispatch({ type: FOCUS_WILL })}
          >
            Focus your will
          </button>
        );

      default:
        return null;
    }
  };

  const activeAction = (
    name: Element,
    element: ElementState,
    allElements: ElementsCollection<ElementState>,
  ) => {
    const will = allElements.will;
    return (
      <button
        key={"activate" + name}
        onClick={() => dispatch(forceGen(name))}
        disabled={will.value < GEN_COST || element.value >= element.max}
      >
        Generate {name}
      </button>
    );
  };

  const actions = [];
  for (const elt of ALL_ELEMENTS) {
    const element = elements[elt];
    if (element.status == Status.DISCOVERABLE) {
      actions.push(discoverAction(elt)); //, element, base.elements));
    } else if (element.status == Status.ACTIVE) {
      actions.push(activeAction(elt, element, elements));
    }
  }

  return <div className="actions">{actions}</div>;
};

const ElementsBoard: React.FC = (): ReactElement => {
  const base = useSelector((state: LayersState) => state.elements);

  const ALL_ELEMENTS: Array<Element> = [
    "will",
    "air",
    "earth",
    "fire",
    "water",
  ];

  return (
    <div className="elementsboard">
      {ALL_ELEMENTS.map((elt) => (
        <Element key={"element" + elt} name={elt} />
      ))}

      <Actions />
      {/*
      <pre>{JSON.stringify(base, null, 2)}</pre>
      */}
    </div>
  );
};

export default ElementsBoard;

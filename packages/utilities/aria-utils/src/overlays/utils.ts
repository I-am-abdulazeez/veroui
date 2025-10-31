import type { OverlayPlacement } from "./types";

type Placement =
    | "bottom"
    | "bottom left"
    | "bottom right"
    | "bottom start"
    | "bottom end"
    | "top"
    | "top left"
    | "top right"
    | "top start"
    | "top end"
    | "left"
    | "left top"
    | "left bottom"
    | "start"
    | "start top"
    | "start bottom"
    | "right"
    | "right top"
    | "right bottom"
    | "end"
    | "end top"
    | "end bottom";

type Axis = "top" | "bottom" | "left" | "right";
type PlacementAxis = Axis | "center";

export const getTransformOrigins = (placement: OverlayPlacement) => {
    const origins: Record<
        OverlayPlacement,
        {
            originX?: number;
            originY?: number;
        }
    > = {
        top: {
            originY: 1,
        },
        bottom: {
            originY: 0,
        },
        left: {
            originX: 1,
        },
        right: {
            originX: 0,
        },
        "top-start": {
            originX: 0,
            originY: 1,
        },
        "top-end": {
            originX: 1,
            originY: 1,
        },
        "bottom-start": {
            originX: 0,
            originY: 0,
        },
        "bottom-end": {
            originX: 1,
            originY: 0,
        },
        "right-start": {
            originX: 0,
            originY: 0,
        },
        "right-end": {
            originX: 0,
            originY: 1,
        },
        "left-start": {
            originX: 1,
            originY: 0,
        },
        "left-end": {
            originX: 1,
            originY: 1,
        },
    };

    return origins?.[placement] || {};
};

export const toReactAriaPlacement = (placement: OverlayPlacement) => {
    const mapPositions: Record<OverlayPlacement, Placement> = {
        top: "top",
        bottom: "bottom",
        left: "left",
        right: "right",
        "top-start": "top start",
        "top-end": "top end",
        "bottom-start": "bottom start",
        "bottom-end": "bottom end",
        "left-start": "left top",
        "left-end": "left bottom",
        "right-start": "right top",
        "right-end": "right bottom",
    };

    return mapPositions[placement];
};

export const toOverlayPlacement = (placement: PlacementAxis) => {
    const mapPositions: Record<PlacementAxis, OverlayPlacement> = {
        top: "top",
        bottom: "bottom",
        left: "left",
        right: "right",
        center: "top",
    };

    return mapPositions[placement];
};

export const getShouldUseAxisPlacement = (axisPlacement: PlacementAxis, overlayPlacement: OverlayPlacement) => {
    if (overlayPlacement.includes("-")) {
        const [position] = overlayPlacement.split("-");

        if (position.includes(axisPlacement)) {
            return false;
        }
    }

    return true;
};

export const getArrowPlacement = (dynamicPlacement: PlacementAxis, placement: OverlayPlacement) => {
    if (placement.includes("-")) {
        const [, position] = placement.split("-");

        return `${dynamicPlacement}-${position}`;
    }

    return dynamicPlacement;
};

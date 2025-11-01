// import {isAppleDevice} from "@react-aria/utils";
// import {isMac} from "@react-aria/utils";

function testPlatform(re: RegExp) {
    return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.userAgent) : false;
}

function cached(fn: () => boolean) {
    if (process.env.NODE_ENV === "test") {
        return fn;
    }

    return fn;
    // let res: boolean | null = null;
    // return () => {
    //     if (res == null) {
    //         res = fn();
    //     }
    //     return res;
    // };
}

export const isMac: () => boolean = cached(function () {
    return testPlatform(/^Mac/i);
});

const isIPhone: () => boolean = cached(function () {
    return testPlatform(/^iPhone/i);
});

const isIPad: () => boolean = cached(function () {
    return (
        testPlatform(/^iPad/i) ||
        // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1)
    );
});

const isIOS: () => boolean = cached(function () {
    return isIPhone() || isIPad();
});

const isAppleDevice: () => boolean = cached(function () {
    return isMac() || isIOS();
});

interface Event {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}

export function isNonContiguousSelectionModifier(e: Event) {
    // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
    // On Windows and Ubuntu, Alt + Space has a system wide meaning.
    return isAppleDevice() ? e.altKey : e.ctrlKey;
}

export function isCtrlKeyPressed(e: Event) {
    if (isMac()) {
        return e.metaKey;
    }

    return e.ctrlKey;
}

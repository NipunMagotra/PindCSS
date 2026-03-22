const Pind = {
    init() {
        this.scan(document.body);
        
        // Dynamic DOM observer so any new elements added dynamically get styles applied instantly!
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        this.scan(node);
                    }
                });
            });
        });
        
        // Start observing document body for injected elements
        observer.observe(document.body, { childList: true, subtree: true });
    },

    scan(rootNode) {
        // Collect all child elements with classes, including the root node itself
        const elements = rootNode.querySelectorAll ? rootNode.querySelectorAll("[class]") : [];
        const nodes = [rootNode, ...elements].filter(el => el.classList && el.classList.length > 0);
        
        nodes.forEach(el => {
            Array.from(el.classList).forEach(className => {
                const styles = this.parse(className);
                if (styles) {
                    // Apply extracted styles directly inline
                    Object.keys(styles).forEach(prop => {
                        el.style[prop] = styles[prop];
                    });
                    
                    // Remove the class to keep HTML clean as requested
                    el.classList.remove(className);
                }
            });
        });
    },

    parse(className) {
        // Direct matches (no dashes needed for these popular layouts)
        const directMap = {
            'flex': { display: 'flex' },
            'grid': { display: 'grid' },
            'block': { display: 'block' },
            'inline-block': { display: 'inline-block' },
            'hidden': { display: 'none' },
            'col': { flexDirection: 'column' },
            'row': { flexDirection: 'row' },
            'center': { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            'pointer': { cursor: 'pointer' },
            'relative': { position: 'relative' },
            'absolute': { position: 'absolute' },
            'w-full': { width: '100%' },
            'h-full': { height: '100%' },
            'h-screen': { height: '100vh' },
            'w-screen': { width: '100vw' }
        };

        if (directMap[className]) return directMap[className];

        // Process utility prefixes (e.g. mb-20, bg-red)
        const parts = className.split('-');
        if (parts.length < 2) return null;

        const prefix = parts[0];
        const valStr = parts.slice(1).join('-'); // Rejoin just in case value had hyphens
        
        const val = this.formatValue(valStr);
        const colorVal = this.formatColor(valStr);

        switch (prefix) {
            // Spacing
            case 'p': return { padding: val };
            case 'pt': return { paddingTop: val };
            case 'pb': return { paddingBottom: val };
            case 'pl': return { paddingLeft: val };
            case 'pr': return { paddingRight: val };
            case 'px': return { paddingLeft: val, paddingRight: val };
            case 'py': return { paddingTop: val, paddingBottom: val };
            
            case 'm': return { margin: val };
            case 'mt': return { marginTop: val };
            case 'mb': return { marginBottom: val };
            case 'ml': return { marginLeft: val };
            case 'mr': return { marginRight: val };
            case 'mx': return { marginLeft: val, marginRight: val };
            case 'my': return { marginTop: val, marginBottom: val };

            // Sizing
            case 'w': return { width: val };
            case 'h': return { height: val };
            case 'min-w': return { minWidth: val };
            case 'min-h': return { minHeight: val };
            case 'max-w': return { maxWidth: val };
            case 'max-h': return { maxHeight: val };

            // Colors
            case 'bg': return { backgroundColor: colorVal };
            case 'c':
            case 'text':
                // It could be an alignment instead of a color
                if (['left', 'center', 'right', 'justify'].includes(valStr)) {
                    return { textAlign: valStr };
                }
                return { color: colorVal };
            
            // Typography
            case 'fs': return { fontSize: val };
            case 'fw': return { fontWeight: valStr };
            case 'lh': return { lineHeight: valStr };
            case 'tracking': return { letterSpacing: val };

            // Borders
            case 'radius': 
            case 'rounded': return { borderRadius: val };
            case 'border': 
                if (['none', 'solid', 'dashed', 'dotted'].includes(valStr)) return { borderStyle: valStr };
                if (!isNaN(valStr)) return { borderWidth: val }; // e.g. border-2
                return { border: `1px solid ${colorVal}` };     // e.g. border-red
            
            // Flex/Grid utilities
            case 'flex': return { flex: valStr }; // e.g., flex-1
            case 'items': return { alignItems: valStr };
            case 'justify': return { justifyContent: valStr };
            case 'gap': return { gap: val };
            
            // Positioning & Misc
            case 'shadow': return { boxShadow: `0 ${(parseInt(valStr)||4)}px ${(parseInt(valStr)||10)*2}px rgba(0,0,0,0.15)` };
            case 'opacity': return { opacity: valStr };
            case 'z': return { zIndex: valStr };
            case 'top': return { top: val };
            case 'bottom': return { bottom: val };
            case 'left': return { left: val };
            case 'right': return { right: val };
        }

        return null;
    },

    formatValue(val) {
        // Automatically convert raw numbers to pixels (much easier than tailwind brackets!)
        if (!isNaN(val)) return val + 'px';
        // 'p' mapping to percentage for easy responsiveness: w-100p -> 100%
        if (val.endsWith('p')) return val.replace('p', '%');
        return val;
    },

    formatColor(val) {
        // Automatically prefix hex codes with # if it looks like a hex color
        if (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(val)) return `#${val}`;
        return val; // e.g., "red", "transparent", "rgba(0,0,0,0.5)"
    }
};

// Support for NPM / Node Modules / ES6 Imports
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Pind;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return Pind; });
} else {
    // Standard Browser Environment Setup
    window.Pind = Pind;
    // Automatically initialize Engine on page load if added as a raw script
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", () => Pind.init());
    } else {
        Pind.init();
    }
}

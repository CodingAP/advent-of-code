/**
 * frontend/src/themes.ts
 *
 * colour themes: css variables per theme live in styles.css ([data-theme=...]); this file lists them and
 * carries the matching monaco editor colours
 */

export interface Theme {
    id: string;
    name: string;
    dark: boolean;
    editor: {
        base: 'vs' | 'vs-dark' | 'hc-black';
        colors: Record<string, string>;
        rules?: { token: string; foreground?: string; fontStyle?: string }[];
    };
}

export const THEMES: Theme[] = [
    {
        id: 'aoc',
        name: 'advent of code (dark)',
        dark: true,
        editor: {
            base: 'vs-dark',
            colors: {
                'editor.background': '#0f0f23',
                'editorLineNumber.foreground': '#666688',
                'editorLineNumber.activeForeground': '#00cc00',
                'editorCursor.foreground': '#00cc00',
                'editor.lineHighlightBorder': '#1f1f3a',
            },
        },
    },
    {
        id: 'light',
        name: 'light',
        dark: false,
        editor: {
            base: 'vs',
            colors: {
                'editor.background': '#ffffff',
                'editorLineNumber.foreground': '#9aa0b0',
                'editorLineNumber.activeForeground': '#0a7a0a',
                'editorCursor.foreground': '#0a7a0a',
                'editor.lineHighlightBorder': '#e6e9f0',
            },
        },
    },
    {
        id: 'hacker',
        name: 'hacker',
        dark: true,
        editor: {
            base: 'vs-dark',
            colors: {
                'editor.background': '#000000',
                'editor.foreground': '#33ff33',
                'editorLineNumber.foreground': '#1f8f1f',
                'editorLineNumber.activeForeground': '#00ff41',
                'editorCursor.foreground': '#00ff41',
                'editor.lineHighlightBorder': '#0f3f0f',
                'editor.selectionBackground': '#0f5f0f',
            },
            rules: [
                { token: '', foreground: '33ff33' },
                { token: 'comment', foreground: '1f8f1f', fontStyle: 'italic' },
                { token: 'keyword', foreground: '00ff41', fontStyle: 'bold' },
                { token: 'string', foreground: 'aaffaa' },
                { token: 'number', foreground: 'ffff33' },
                { token: 'type', foreground: '66ff99' },
                { token: 'identifier', foreground: '33ff33' },
            ],
        },
    },
    {
        id: 'aero',
        name: 'frutiger aero',
        dark: false,
        editor: {
            base: 'vs',
            colors: {
                'editor.background': '#ffffff88',
                'editor.foreground': '#1a2a3a',
                'editorLineNumber.foreground': '#8fb3d9',
                'editorLineNumber.activeForeground': '#0b74d1',
                'editorCursor.foreground': '#0b74d1',
                'editor.lineHighlightBorder': '#dcecfb',
                'editor.selectionBackground': '#bfe0ff',
            },
            rules: [{ token: 'keyword', foreground: '0b74d1' }, { token: 'string', foreground: '2e8b2e' }, { token: 'number', foreground: 'd17b0b' }, {
                token: 'comment',
                foreground: '7a97b3',
                fontStyle: 'italic',
            }],
        },
    },
    {
        id: 'dracula',
        name: 'dracula',
        dark: true,
        editor: {
            base: 'vs-dark',
            colors: {
                'editor.background': '#282a36',
                'editor.foreground': '#f8f8f2',
                'editorLineNumber.foreground': '#6272a4',
                'editorLineNumber.activeForeground': '#f8f8f2',
                'editorCursor.foreground': '#f8f8f2',
                'editor.lineHighlightBorder': '#44475a',
                'editor.selectionBackground': '#44475a',
            },
            rules: [{ token: 'keyword', foreground: 'ff79c6' }, { token: 'string', foreground: 'f1fa8c' }, { token: 'number', foreground: 'bd93f9' }, {
                token: 'comment',
                foreground: '6272a4',
                fontStyle: 'italic',
            }, { token: 'type', foreground: '8be9fd' }],
        },
    },
    {
        id: 'nord',
        name: 'nord',
        dark: true,
        editor: {
            base: 'vs-dark',
            colors: {
                'editor.background': '#2e3440',
                'editor.foreground': '#d8dee9',
                'editorLineNumber.foreground': '#4c566a',
                'editorLineNumber.activeForeground': '#d8dee9',
                'editorCursor.foreground': '#d8dee9',
                'editor.lineHighlightBorder': '#3b4252',
                'editor.selectionBackground': '#434c5e',
            },
            rules: [{ token: 'keyword', foreground: '81a1c1' }, { token: 'string', foreground: 'a3be8c' }, { token: 'number', foreground: 'b48ead' }, {
                token: 'comment',
                foreground: '616e88',
                fontStyle: 'italic',
            }, { token: 'type', foreground: '8fbcbb' }],
        },
    },
    {
        id: 'synthwave',
        name: 'synthwave',
        dark: true,
        editor: {
            base: 'vs-dark',
            colors: {
                'editor.background': '#241b2f',
                'editor.foreground': '#e0d6ff',
                'editorLineNumber.foreground': '#7a6b8f',
                'editorLineNumber.activeForeground': '#ff7edb',
                'editorCursor.foreground': '#ff7edb',
                'editor.lineHighlightBorder': '#3a2d4d',
                'editor.selectionBackground': '#4a3b63',
            },
            rules: [{ token: 'keyword', foreground: 'ff7edb' }, { token: 'string', foreground: 'fede5d' }, { token: 'number', foreground: 'f97e72' }, {
                token: 'comment',
                foreground: '7a6b8f',
                fontStyle: 'italic',
            }, { token: 'type', foreground: '36f9f6' }],
        },
    },
];

export const DEFAULT_THEME = 'aoc';

export const getTheme = (id: string): Theme => THEMES.find((theme) => theme.id === id) ?? THEMES[0];

export const monacoThemeName = (id: string) => `aoc-${getTheme(id).id}`;

/**
 * switches the css variables (and the dock's base theme class) for the whole app
 */
export const applyTheme = (id: string): Theme => {
    const theme = getTheme(id);
    document.documentElement.dataset.theme = theme.id;
    document.documentElement.classList.toggle('theme-dark', theme.dark);
    document.documentElement.classList.toggle('theme-light', !theme.dark);
    return theme;
};

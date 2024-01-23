export const HighlightSearchResult = ({text, highlightText}) => {
        let parts = text.split(new RegExp(`(${highlightText})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} className={part.toLowerCase() === highlightText.toLowerCase() ? 'font-bold bg-amber-200 text-yellow-800 rounded underline underline-offset-4' : ''}>
                {part}
            </span>)
        } </span>;
    }

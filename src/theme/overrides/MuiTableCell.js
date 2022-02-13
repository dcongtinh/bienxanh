// Palette
import palette from '../palette'

export default {
    root: {
        borderBottom: `1px solid ${palette.divider}`,
        fontSize: '14px',
        padding: '4px 8px 4px 0',
        zIndex: '0 !important'
    },
    head: {
        fontSize: '16px',
        color: palette.text.primary,
        whiteSpace: 'nowrap',
        padding: 0,
        paddingBottom: 4
    },
    body: {
        whiteSpace: 'nowrap'
    }
}

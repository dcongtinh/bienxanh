// Palette
import palette from '../palette'

export default {
    root: {
        borderBottom: `1px solid ${palette.divider}`,
        fontSize: '14px',
        // padding: '14px 0px 14px 24px'
        padding: '4px 0 0 24px',
        zIndex: '0 !important'
    },
    head: {
        fontSize: '16px',
        color: palette.text.primary,
        whiteSpace: 'nowrap',
        // padding: '2px 0px 14px 24px'
        padding: '0 0 0 24px'
    },
    body: {
        whiteSpace: 'nowrap'
    }
}

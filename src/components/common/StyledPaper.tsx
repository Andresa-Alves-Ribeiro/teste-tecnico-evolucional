import { Paper, PaperProps, useTheme } from '@mui/material';

interface StyledPaperProps extends PaperProps {
    children: React.ReactNode;
    withGradientBorder?: boolean;
}

const StyledPaper = ({
    children,
    withGradientBorder = true,
    sx,
    ...props
}: StyledPaperProps) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const paperStyles = {
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        background: isDarkMode
            ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))'
            : 'linear-gradient(135deg, #FFFFFF, #FAFAFA)',
        boxShadow: isDarkMode
            ? '0 4px 24px rgba(0, 0, 0, 0.3)'
            : '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        position: 'relative' as const,
        overflow: 'hidden',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isDarkMode
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
        ...(withGradientBorder && {
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
        }),
        ...sx,
    };

    return (
        <Paper elevation={0} sx={paperStyles} {...props}>
            {children}
        </Paper>
    );
};

export default StyledPaper;

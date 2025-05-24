import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useTheme,
    useMediaQuery,
    Typography,
    Box,
    alpha,
    IconButton,
    Tooltip,
    Avatar,
    Card,
    CardContent,
    Stack,
    Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

interface TableItem {
    id: number;
    teacherId?: number;
    degreeId?: number;
    classId?: number;
    name?: string;
    subject?: string;
    [key: string]: string | number | boolean | null | undefined;
}

interface Column {
    key: string;
    label: string;
    render?: (item: TableItem) => React.ReactNode;
}

interface DataTableProps {
    title: string;
    items: TableItem[];
    columns: Column[];
    onShowDetails?: (id: number | null) => void;
    showDetailsId?: number | null;
    onEdit?: (item: TableItem) => void;
    editingItem?: TableItem | null;
    onEditingItemChange?: (item: TableItem) => void;
    getDegreeColor?: (degreeName: string) => { bg: string; color: string };
    getClassColor?: (className: string) => { bg: string; color: string };
}

const DataTable: React.FC<DataTableProps> = ({
    title,
    items,
    columns,
    onShowDetails,
    showDetailsId,
    onEdit,
    editingItem,
    onEditingItemChange,
    getDegreeColor,
    getClassColor,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const renderMobileView = (item: TableItem) => {
        return (
            <Card
                key={item.id}
                sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.06)}`,
                    '&:hover': {
                        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                    },
                }}
            >
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                <PersonIcon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    ID: {item.id}
                                </Typography>
                            </Box>
                            {onEdit && (
                                <Tooltip title="Editar">
                                    <IconButton
                                        onClick={() => onEdit(item)}
                                        size="small"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            },
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {columns.map((column) => {
                                if (column.key === 'name') return null;
                                const content = column.render ? column.render(item) : item[column.key];
                                if (typeof content === 'string') {
                                    const colors = getDegreeColor && column.key.includes('degree')
                                        ? getDegreeColor(content)
                                        : getClassColor && column.key.includes('class')
                                            ? getClassColor(content)
                                            : {
                                                bg: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                            };
                                    return (
                                        <Chip
                                            key={column.key}
                                            label={content}
                                            size="small"
                                            sx={{
                                                backgroundColor: colors.bg,
                                                color: colors.color,
                                                fontWeight: 500,
                                            }}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.98)})`,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.06)}`,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
            }}
        >
            <Box
                sx={{
                    p: { xs: 2, sm: 3 },
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 24, sm: 28 } }} />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                    }}
                >
                    {title}
                </Typography>
                <Chip
                    label={`${items.length} itens`}
                    size="small"
                    sx={{
                        ml: { xs: 0, sm: 'auto' },
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                    }}
                />
            </Box>

            {isMobile ? (
                <Box sx={{ p: 2, width: '100%', boxSizing: 'border-box' }}>
                    {items.map((item) => renderMobileView(item))}
                </Box>
            ) : (
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ width: '100%' }}>
                        <Table
                            sx={{
                                width: '100%',
                                tableLayout: 'fixed',
                                borderCollapse: 'collapse'
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.02)})`,
                                        '& th': {
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            borderBottom: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            fontSize: '0.95rem',
                                            letterSpacing: '0.5px',
                                            padding: '20px 16px',
                                            whiteSpace: 'nowrap',
                                            boxSizing: 'border-box',
                                            '&:first-of-type': {
                                                paddingLeft: '24px'
                                            },
                                            '&:last-of-type': {
                                                paddingRight: '24px'
                                            }
                                        }
                                    }}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            align={column.key === 'name' ? 'left' : 'center'}
                                            sx={{
                                                width: column.key === 'name' ? '40%' : `${60 / (columns.length - 1)}%`,
                                                boxSizing: 'border-box'
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    {(onShowDetails || onEdit) && (
                                        <TableCell
                                            align="right"
                                            sx={{
                                                width: '100px',
                                                boxSizing: 'border-box'
                                            }}
                                        >
                                            Ações
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                                transition: 'all 0.2s ease',
                                            },
                                            '& td': {
                                                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                                color: theme.palette.text.primary,
                                                padding: '16px',
                                                whiteSpace: 'nowrap',
                                                boxSizing: 'border-box',
                                                '&:first-of-type': {
                                                    paddingLeft: '24px'
                                                },
                                                '&:last-of-type': {
                                                    paddingRight: '24px'
                                                }
                                            },
                                            '&:last-child td': {
                                                borderBottom: 'none',
                                            },
                                        }}
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.key}
                                                align={column.key === 'name' ? 'left' : 'center'}
                                                sx={{
                                                    width: column.key === 'name' ? '40%' : `${60 / (columns.length - 1)}%`,
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                {column.render ? column.render(item) : item[column.key]}
                                            </TableCell>
                                        ))}
                                        {(onShowDetails || onEdit) && (
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    width: '100px',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                                                    {onShowDetails && (
                                                        <Tooltip title={showDetailsId === item.id ? "Ocultar detalhes" : "Ver detalhes"}>
                                                            <IconButton
                                                                onClick={() => onShowDetails(showDetailsId === item.id ? null : item.id)}
                                                                size="small"
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    '&:hover': {
                                                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                                    },
                                                                }}
                                                            >
                                                                {showDetailsId === item.id ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                    {onEdit && (
                                                        <Tooltip title="Editar">
                                                            <IconButton
                                                                onClick={() => onEdit(item)}
                                                                size="small"
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    '&:hover': {
                                                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                                    },
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Paper>
    );
};

export default DataTable; 
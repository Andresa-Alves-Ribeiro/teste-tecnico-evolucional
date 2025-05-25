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
    Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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
    onSave?: (item: TableItem) => void;
    getDegreeColor?: (degreeName: string) => { bg: string; color: string };
    getClassColor?: (className: string) => { bg: string; color: string };
}

const MobileCard: React.FC<{
    item: TableItem;
    columns: Column[];
    onShowDetails?: (id: number | null) => void;
    showDetailsId?: number | null;
    onEdit?: (item: TableItem) => void;
    editingItem?: TableItem | null;
    onSave?: (item: TableItem) => void;
    getDegreeColor?: (degreeName: string) => { bg: string; color: string };
    getClassColor?: (className: string) => { bg: string; color: string };
}> = ({ item, columns, onShowDetails, showDetailsId, onEdit, editingItem, onSave, getDegreeColor, getClassColor }) => {
    const theme = useTheme();
    const isEditing = editingItem?.id === item.id;

    const getChipStyles = (column: Column, content: string) => ({
        backgroundColor: getDegreeColor && column.key.includes('degree')
            ? getDegreeColor(content).bg
            : getClassColor && column.key.includes('class')
                ? getClassColor(content).bg
                : alpha(theme.palette.primary.main, 0.1),
        color: getDegreeColor && column.key.includes('degree')
            ? getDegreeColor(content).color
            : getClassColor && column.key.includes('class')
                ? getClassColor(content).color
                : theme.palette.primary.main,
        fontWeight: 500,
        alignSelf: 'flex-start',
    });

    const renderColumnContent = (column: Column) => {
        if (column.key === 'name' || column.key === 'id') return null;
        const content = column.render ? column.render(item) : item[column.key];
        if (!content) return null;

        return (
            <Box key={column.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {column.label}:
                </Typography>
                {typeof content === 'string' ? (
                    <Chip
                        label={content}
                        size="small"
                        sx={getChipStyles(column, content)}
                    />
                ) : (
                    <Typography variant="body2" color="text.primary">
                        {content}
                    </Typography>
                )}
            </Box>
        );
    };

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.06)}`,
                '&:hover': {
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                },
                width: '100%',
                display: 'block',
            }}
        >
            <CardContent sx={{ p: 2 }}>
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
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: theme.palette.text.primary }}>
                                {columns.find(col => col.key === 'name')?.render?.(item) || item.name}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {onShowDetails && !isEditing && (
                                <Tooltip title={showDetailsId === item.id ? "Ocultar detalhes" : "Ver detalhes"}>
                                    <IconButton
                                        onClick={() => onShowDetails(showDetailsId === item.id ? null : item.id)}
                                        size="small"
                                        sx={{
                                            color: showDetailsId === item.id ? theme.palette.primary.main : theme.palette.text.secondary,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            },
                                        }}
                                    >
                                        {showDetailsId === item.id ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                            {onEdit && !isEditing && (
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
                            {isEditing && onSave && (
                                <Tooltip title="Salvar">
                                    <IconButton
                                        onClick={() => onSave(editingItem)}
                                        size="small"
                                        sx={{
                                            color: theme.palette.success.main,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                            },
                                        }}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Stack spacing={1.5}>
                        {columns.map(renderColumnContent)}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

const DataTable: React.FC<DataTableProps> = ({
    title,
    items,
    columns,
    onShowDetails,
    showDetailsId,
    onEdit,
    editingItem,
    onEditingItemChange,
    onSave,
    getDegreeColor,
    getClassColor,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const renderTableHeader = () => (
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
                <TableCell key={column.key} align="left">
                    {column.label}
                </TableCell>
            ))}
            {(onShowDetails || onEdit || onSave) && (
                <TableCell align="right" sx={{ width: '100px' }}>
                    Ações
                </TableCell>
            )}
        </TableRow>
    );

    const renderTableRow = (item: TableItem) => {
        const isEditing = editingItem?.id === item.id;

        const getChipStyles = (column: Column, content: string) => ({
            backgroundColor: getDegreeColor && column.key.includes('degree')
                ? getDegreeColor(content).bg
                : getClassColor && column.key.includes('class')
                    ? getClassColor(content).bg
                    : alpha(theme.palette.primary.main, 0.1),
            color: getDegreeColor && column.key.includes('degree')
                ? getDegreeColor(content).color
                : getClassColor && column.key.includes('class')
                    ? getClassColor(content).color
                    : theme.palette.primary.main,
            fontWeight: 500,
        });

        return (
            <TableRow
                key={item.id}
                sx={{
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    },
                    '& td': {
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        padding: '16px',
                        fontSize: '0.95rem',
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
                    <TableCell key={column.key} align="left">
                        {column.render ? (
                            typeof column.render(item) === 'string' ? (
                                <Chip
                                    label={column.render(item)}
                                    size="small"
                                    sx={getChipStyles(column, column.render(item) as string)}
                                />
                            ) : (
                                column.render(item)
                            )
                        ) : (
                            item[column.key]
                        )}
                    </TableCell>
                ))}
                {(onShowDetails || onEdit || onSave) && (
                    <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {onShowDetails && !isEditing && (
                                <Tooltip title={showDetailsId === item.id ? "Ocultar detalhes" : "Ver detalhes"}>
                                    <IconButton
                                        onClick={() => onShowDetails(showDetailsId === item.id ? null : item.id)}
                                        size="small"
                                        sx={{
                                            color: showDetailsId === item.id ? theme.palette.primary.main : theme.palette.text.secondary,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            },
                                        }}
                                    >
                                        {showDetailsId === item.id ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                            {onEdit && !isEditing && (
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
                            {isEditing && onSave && (
                                <Tooltip title="Salvar">
                                    <IconButton
                                        onClick={() => onSave(editingItem)}
                                        size="small"
                                        sx={{
                                            color: theme.palette.success.main,
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                            },
                                        }}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </TableCell>
                )}
            </TableRow>
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
                width: '100%',
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
                    label={`${items.length} ${title.toLowerCase()}`}
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
                    {items.map((item) => (
                        <MobileCard
                            key={item.id}
                            item={item}
                            columns={columns}
                            onShowDetails={onShowDetails}
                            showDetailsId={showDetailsId}
                            onEdit={onEdit}
                            editingItem={editingItem}
                            onSave={onSave}
                            getDegreeColor={getDegreeColor}
                            getClassColor={getClassColor}
                        />
                    ))}
                </Box>
            ) : (
                <Box sx={{ width: '100%', overflow: 'auto' }}>
                    <TableContainer>
                        <Table sx={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                            <TableHead>
                                {renderTableHeader()}
                            </TableHead>
                            <TableBody>
                                {items.map(renderTableRow)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Paper>
    );
};

export default DataTable; 
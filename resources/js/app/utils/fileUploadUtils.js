// File upload utility functions
export const FILE_SIZE_LIMITS = {
    MAX_SIZE_MB: 50,
    MAX_SIZE_BYTES: 50 * 1024 * 1024 // 50MB in bytes
};

export const validateFileSize = (file) => {
    if (!file) {
        return { isValid: false, error: 'No file provided' };
    }

    const fileSizeMB = file.size / (1024 * 1024);
    
    if (file.size > FILE_SIZE_LIMITS.MAX_SIZE_BYTES) {
        return {
            isValid: false,
            error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds the maximum allowed size of ${FILE_SIZE_LIMITS.MAX_SIZE_MB}MB`,
            sizeMB: fileSizeMB.toFixed(2)
        };
    }

    return {
        isValid: true,
        sizeMB: fileSizeMB.toFixed(2)
    };
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const showFileSizeError = (file) => {
    const validation = validateFileSize(file);
    if (!validation.isValid) {
        // You can use your preferred notification library here
        console.error(validation.error);
        // message.error(validation.error); // For Ant Design
        // toast.error(validation.error); // For React Toast
        return false;
    }
    return true;
};

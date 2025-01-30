export interface Link {
    label: string;
    url: string;
    nav?: string;
    external?: boolean;
    target?: '_self'|'_blank';
}

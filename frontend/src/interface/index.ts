export interface StrData {
    max: number,
    total: number,
    ave: number,
    user: number,
    toot: number,
    public: number,
    unlisted: number,
    private: number,
    local_only: number,
    [key: string]: number
}
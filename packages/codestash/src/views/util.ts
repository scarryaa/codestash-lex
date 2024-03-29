import { BlobRef } from "@atproto/lexicon"

export const cidFromBlobJson = (json: BlobRef) => {
    if (json instanceof BlobRef) {
        return json.ref.toString()
    }
    // @NOTE below handles the fact that parseRecordBytes() produces raw json rather than lexicon values
    if (json['$type'] === 'blob') {
        return (json['ref']?.['$link'] ?? '') as string
    }
    return (json['cid'] ?? '') as string
}
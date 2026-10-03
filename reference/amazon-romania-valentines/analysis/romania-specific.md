# Romania-Specific Behavior Analysis

## Observations from Authoritative Target Screenshot
1. **Destination Country Indicator**:
   - Location indicator displays: `Deliver to Romania`
   - Country code: `RO`
2. **International Shipping Context**:
   - Amazon does not operate an independent native `.ro` fulfillment domain; it serves Romanian customers through international storefront routing (e.g. Amazon.com or European hubs).
   - Hence, currency is USD (`$`) or EUR, and default interface language is English (`EN`), with international shipping to Romania.
3. **Delivery Popover Modal**:
   - Displays proactively on initial visit:
     `"We're showing you items that ship to RO. To see items that ship to a different country, change your delivery address."`
   - Actions:
     * `Don't Change`
     * `Change Address`
4. **Worldwide Shipping Callout**:
   - Column 4 showcases Amazon Global Export:
     `"We ship over 45 million products around the world"`

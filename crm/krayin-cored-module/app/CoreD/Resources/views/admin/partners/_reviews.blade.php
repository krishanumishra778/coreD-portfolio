@php
    // After a failed save the rows come from the submitted form, even when every row was removed (then nothing is posted for
    // "reviews" and old('reviews') is null: the marker tells that apart from a first visit, so removed reviews do not come back).
    $reviewRows = old('reviews_submitted')
        ? (is_array(old('reviews')) ? array_values(old('reviews')) : [])
        : array_values((array) ($storedReviews ?? []));
@endphp
<fieldset class="flex flex-col gap-3 rounded border border-gray-300 p-3 dark:border-gray-800" id="partner-reviews" data-max="10" aria-describedby="partner-reviews-help">
                <legend class="px-1">Reviews</legend>
                <input type="hidden" name="reviews_submitted" value="1">
                <p id="partner-reviews-help" class="text-xs">Up to 10. Add only real reviews you can attribute. If a review is a summary of a G2 or Trustpilot review, say so in the review text. Name and review text are required; rating is optional (1 to 5).</p>
                <div id="partner-review-rows" class="flex flex-col gap-3">
                    @foreach ($reviewRows as $i => $row)
                        @php $row = is_array($row) ? $row : []; @endphp
                        <div class="partner-review-row flex flex-col gap-2 rounded border border-gray-200 p-3 dark:border-gray-700" data-review-row>
                            <div class="flex items-center justify-between"><strong data-review-title>Review {{ $i + 1 }}</strong>
                                <button type="button" class="text-red-600" data-review-remove aria-label="Remove review {{ $i + 1 }}">Remove</button></div>
                            <div class="grid gap-2 md:grid-cols-3">
                                <label>Name <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[{{ $i }}][author]" value="{{ $row['author'] ?? '' }}" maxlength="80" autocomplete="off"></label>
                                <label>Role or company <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[{{ $i }}][role]" value="{{ $row['role'] ?? '' }}" maxlength="100" autocomplete="off"></label>
                                <label>Rating (optional) <select class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[{{ $i }}][rating]">
                                    <option value="">No rating</option>
                                    @foreach ([5, 4, 3, 2, 1] as $n)<option value="{{ $n }}" @selected((string) ($row['rating'] ?? '') === (string) $n)>{{ $n }} / 5</option>@endforeach
                                </select></label>
                            </div>
                            <label>Review text <textarea class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[{{ $i }}][text]" rows="3" maxlength="600">{{ $row['text'] ?? '' }}</textarea></label>
                        </div>
                    @endforeach
                </div>
                <div><button type="button" class="secondary-button" id="partner-review-add">Add review</button> <small id="partner-review-count" aria-live="polite"></small></div>
            </fieldset>

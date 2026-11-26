<fieldset class="flex flex-col gap-3 rounded border border-gray-300 p-3 dark:border-gray-800" id="partner-reviews" data-max="10" aria-describedby="partner-reviews-help">
                <legend class="px-1">Reviews</legend>
                <p id="partner-reviews-help" class="text-xs">Up to 10. Add only real reviews you can attribute. If a review is a summary of a G2 or Trustpilot review, say so in the review text. Name and review text are required; rating is optional (1 to 5).</p>
                <div id="partner-review-rows" class="flex flex-col gap-3">
                    <?php $__currentLoopData = $reviewRows; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $i => $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php $row = is_array($row) ? $row : []; ?>
                        <div class="partner-review-row flex flex-col gap-2 rounded border border-gray-200 p-3 dark:border-gray-700" data-review-row>
                            <div class="flex items-center justify-between"><strong data-review-title>Review <?php echo e($i + 1); ?></strong>
                                <button type="button" class="text-red-600" data-review-remove aria-label="Remove review <?php echo e($i + 1); ?>">Remove</button></div>
                            <div class="grid gap-2 md:grid-cols-3">
                                <label>Name <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[<?php echo e($i); ?>][author]" value="<?php echo e($row['author'] ?? ''); ?>" maxlength="80" autocomplete="off"></label>
                                <label>Role or company <input class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[<?php echo e($i); ?>][role]" value="<?php echo e($row['role'] ?? ''); ?>" maxlength="100" autocomplete="off"></label>
                                <label>Rating (optional) <select class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[<?php echo e($i); ?>][rating]">
                                    <option value="">No rating</option>
                                    <?php $__currentLoopData = [5, 4, 3, 2, 1]; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $n): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?><option value="<?php echo e($n); ?>" <?php if((string) ($row['rating'] ?? '') === (string) $n): echo 'selected'; endif; ?>><?php echo e($n); ?> / 5</option><?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </select></label>
                            </div>
                            <label>Review text <textarea class="w-full rounded border px-2 py-1 dark:bg-gray-800" name="reviews[<?php echo e($i); ?>][text]" rows="3" maxlength="600"><?php echo e($row['text'] ?? ''); ?></textarea></label>
                        </div>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
                <div><button type="button" class="secondary-button" id="partner-review-add">Add review</button> <small id="partner-review-count" aria-live="polite"></small></div>
            </fieldset>
<?php /**PATH /home/claude/cored-portfolio/crm/krayin-cored-module/app/CoreD/Resources/views/admin/partners/_reviews.blade.php ENDPATH**/ ?>
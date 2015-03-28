<section class="text-columns">
<?php
if(have_rows('columns')) :

  while(have_rows('columns')) : the_row();
    $content = get_sub_field('content'); ?>

    <div class="column">
      <?php 
      if($content) {
        echo apply_filters('the_content', $content);
      } ?>
    </div>

  <?php
  endwhile;

endif; ?>
</section>